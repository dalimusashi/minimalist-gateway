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
  imageSrc: string; // PNG path, e.g. "/contact.png"
};

export function ContactCardModal({
  open,
  onOpenChange,
  email,
  imageSrc,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[420px] bg-black border-white/10 text-white p-10">
        <DialogHeader className="mb-6">
          <DialogTitle className="text-xl font-light tracking-tight uppercase text-center">
            Contact
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center text-center gap-6">
          {/* Image */}
          <div className="w-full max-w-[280px]">
            <img
              src={imageSrc}
              alt="Contact"
              className="w-full h-auto object-contain"
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
