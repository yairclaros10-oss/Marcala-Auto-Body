import { useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, Clock, ImagePlus, Phone, Send, ShieldCheck, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BUSINESS } from "@/lib/site";

const DAMAGE_TYPES: Record<string, string> = {
  collision: "Collision damage",
  dent: "Dent / ding",
  bumper: "Bumper damage",
  fender: "Fender damage",
  scratches: "Scratches / paint damage",
  repaint: "Full repaint / color change",
  other: "Other / not sure",
};

const MAX_PHOTOS = 5;

interface EstimateResponse {
  id: string;
}

const inputCls =
  "bg-[#1A202C] border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-[#DC2626]";

export default function EstimateForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    year: "",
    make: "",
    model: "",
    description: "",
  });
  const [damageType, setDamageType] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [successId, setSuccessId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const addPhotos = (files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files).filter((f) => f.type.startsWith("image/"));
    const room = MAX_PHOTOS - photos.length;
    if (incoming.length > room) {
      toast.error(`You can upload up to ${MAX_PHOTOS} photos.`);
    }
    const accepted = incoming.slice(0, Math.max(room, 0));
    setPhotos((p) => [...p, ...accepted]);
    setPreviews((p) => [...p, ...accepted.map((f) => URL.createObjectURL(f))]);
  };

  const removePhoto = (index: number) => {
    URL.revokeObjectURL(previews[index]);
    setPhotos((p) => p.filter((_, i) => i !== index));
    setPreviews((p) => p.filter((_, i) => i !== index));
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const fd = new FormData();
      fd.append("name", form.name);
      fd.append("phone", form.phone);
      fd.append("email", form.email);
      fd.append("vehicle_year", form.year);
      fd.append("vehicle_make", form.make);
      fd.append("vehicle_model", form.model);
      fd.append("description", form.description);
      if (damageType) fd.append("damage_type", damageType);
      photos.forEach((p) => fd.append("photos", p));
      const res = await fetch("/api/estimates", { method: "POST", body: fd });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { detail?: unknown } | null;
        const detail = body?.detail;
        throw new Error(typeof detail === "string" ? detail : "Submission failed — please check the form and try again.");
      }
      return (await res.json()) as EstimateResponse;
    },
    onSuccess: (data) => {
      setSuccessId(data.id);
      toast.success("Estimate request sent", {
        description: "We will review your photos and get back to you shortly.",
      });
    },
    onError: (e: Error) => {
      toast.error("Could not send your request", { description: e.message });
    },
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <section id="estimate" className="border-t border-white/5 bg-[#0E1117] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F87171]">
              Free Estimate
            </p>
            <h2 className="font-heading mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
              Request an Estimate
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-400">
              Tell us about your vehicle and the damage — photos help us give you a faster, more
              accurate quote. We typically respond during business hours.
            </p>
            <div className="mt-8 space-y-5">
              <div className="flex gap-3.5">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
                <p className="text-sm leading-relaxed text-slate-300">
                  <span className="font-semibold text-white">Fast turnaround.</span> Most estimates
                  are reviewed the same business day.
                </p>
              </div>
              <div className="flex gap-3.5">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
                <p className="text-sm leading-relaxed text-slate-300">
                  <span className="font-semibold text-white">Insurance-friendly.</span> Filing a
                  claim? We coordinate directly with your carrier.
                </p>
              </div>
              <div className="flex gap-3.5">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-[#DC2626]" />
                <p className="text-sm leading-relaxed text-slate-300">
                  <span className="font-semibold text-white">Rather talk?</span> Call us at{" "}
                  <a href={BUSINESS.phoneTel} className="font-semibold text-[#F87171] hover:text-white">
                    {BUSINESS.phoneDisplay}
                  </a>{" "}
                  — walk-ins welcome too.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            {successId ? (
              <div
                data-testid="estimate-success-message"
                className="flex h-full flex-col items-center justify-center rounded-xl border border-[#DC2626]/40 bg-[#12161E] p-10 text-center"
              >
                <CheckCircle2 className="h-14 w-14 text-[#DC2626]" />
                <h3 className="font-heading mt-5 text-2xl font-bold text-white">
                  Request Received
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-400">
                  Thank you, {form.name.split(" ")[0] || "friend"}. Your estimate request for your{" "}
                  {form.year} {form.make} {form.model} has been sent to the shop. We will reach out
                  at {form.phone} shortly.
                </p>
                <p className="mt-4 rounded-md bg-white/5 px-3 py-1.5 font-mono text-xs text-slate-500">
                  Reference: {successId.slice(0, 8).toUpperCase()}
                </p>
                <a
                  href={BUSINESS.phoneTel}
                  className="mt-6 inline-flex items-center gap-2 rounded-md border border-white/20 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                >
                  <Phone className="h-4 w-4 text-[#DC2626]" />
                  Need it faster? Call {BUSINESS.phoneDisplay}
                </a>
              </div>
            ) : (
              <form
                data-testid="estimate-form"
                onSubmit={onSubmit}
                className="rounded-xl border border-white/10 bg-[#12161E] p-6 sm:p-8"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="est-name" className="text-slate-300">Name *</Label>
                    <Input id="est-name" data-testid="estimate-input-name" required value={form.name} onChange={set("name")} placeholder="Your full name" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-phone" className="text-slate-300">Phone *</Label>
                    <Input id="est-phone" data-testid="estimate-input-phone" required type="tel" value={form.phone} onChange={set("phone")} placeholder="(704) 555-0123" className={inputCls} />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="est-email" className="text-slate-300">Email *</Label>
                    <Input id="est-email" data-testid="estimate-input-email" required type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-year" className="text-slate-300">Vehicle Year *</Label>
                    <Input id="est-year" data-testid="estimate-input-year" required value={form.year} onChange={set("year")} placeholder="2019" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-make" className="text-slate-300">Make *</Label>
                    <Input id="est-make" data-testid="estimate-input-make" required value={form.make} onChange={set("make")} placeholder="Honda" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="est-model" className="text-slate-300">Model *</Label>
                    <Input id="est-model" data-testid="estimate-input-model" required value={form.model} onChange={set("model")} placeholder="Civic" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Type of Damage</Label>
                    <Select value={damageType} onValueChange={(v: string) => setDamageType(v)}>
                      <SelectTrigger data-testid="estimate-select-damage-type" className={`${inputCls} w-full`}>
                        <SelectValue>
                          {(v: string) => DAMAGE_TYPES[v] ?? "Select damage type"}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="border-white/10 bg-[#1A202C] text-white">
                        {Object.entries(DAMAGE_TYPES).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="est-desc" className="text-slate-300">Description of Damage *</Label>
                    <Textarea
                      id="est-desc"
                      data-testid="estimate-textarea-description"
                      required
                      value={form.description}
                      onChange={set("description")}
                      rows={4}
                      placeholder="Tell us what happened and where the damage is (e.g. rear bumper cracked on the driver's side, scratch along the passenger door...)"
                      className={inputCls}
                    />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-slate-300">Photos of the Vehicle (optional, up to {MAX_PHOTOS})</Label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      data-testid="estimate-file-upload"
                      onChange={(e) => {
                        addPhotos(e.target.files);
                        e.target.value = "";
                      }}
                    />
                    <button
                      type="button"
                      data-testid="estimate-file-upload-button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-[#1A202C]/50 px-4 py-8 text-sm text-slate-400 transition-colors hover:border-[#DC2626]/60 hover:text-slate-200"
                    >
                      <ImagePlus className="h-7 w-7 text-[#DC2626]" />
                      <span>
                        <span className="font-semibold text-white">Click to add photos</span> — JPG,
                        PNG or WebP, up to 10 MB each
                      </span>
                    </button>
                    {previews.length > 0 && (
                      <div className="grid grid-cols-3 gap-3 pt-2 sm:grid-cols-5">
                        {previews.map((src, i) => (
                          <div key={src} className="group relative">
                            <img
                              src={src}
                              alt={`Upload preview ${i + 1}`}
                              className="aspect-square w-full rounded-md border border-white/10 object-cover"
                            />
                            <button
                              type="button"
                              data-testid={`estimate-photo-remove-${i}`}
                              onClick={() => removePhoto(i)}
                              aria-label={`Remove photo ${i + 1}`}
                              className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#DC2626] text-white opacity-90 transition-opacity hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  data-testid="estimate-submit-button"
                  disabled={mutation.isPending}
                  className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#DC2626] px-6 py-4 text-base font-semibold text-white shadow-[0_0_24px_rgba(220,38,38,0.3)] transition-all hover:bg-[#B91C1C] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Send className="h-5 w-5" />
                  {mutation.isPending ? "Sending..." : "Submit Estimate Request"}
                </button>
                <p className="mt-3 text-center text-xs text-slate-500">
                  No obligation. Your information is only used to prepare your estimate.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
