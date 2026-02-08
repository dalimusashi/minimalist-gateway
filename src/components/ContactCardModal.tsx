"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  imageSrc: string; // e.g. "/contact.jpg"
};

export function ContactCardModal({ open, onOpenChange, email, imageSrc }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[360px] bg-black border-white/10 text-white p-8">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-xl font-light tracking-tight uppercase">
            Contact
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center gap-4">
          {/* Image */}
          <div className="w-28 h-28 overflow-hidden rounded-full border border-white/10">
            <img
              src={imageSrc}
              alt="Contact"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="text-sm tracking-widest uppercase opacity-70 hover:opacity-100 hover:underline underline-offset-8 transition"
          >
            {email}
          </a>

          <p className="text-[10px] uppercase tracking-[0.2em] opacity-30 font-light">
            Click to email
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
