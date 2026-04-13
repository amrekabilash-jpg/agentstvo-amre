"use client";

import { motion } from "framer-motion";
import { useT } from "@/lib/lang-context";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

/* ── Avatars in cuate illustration style ── */

const AvatarDamir = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Background circle */}
    <circle cx="60" cy="60" r="60" fill="#EEF2FF" />
    {/* Neck */}
    <rect x="50" y="80" width="20" height="16" rx="4" fill="#FBBF8A" />
    {/* Shoulders */}
    <path d="M20 120 Q30 95 60 93 Q90 95 100 120Z" fill="#5B5FEF" />
    {/* Head */}
    <ellipse cx="60" cy="62" rx="26" ry="28" fill="#FBBF8A" />
    {/* Hair */}
    <path d="M34 55 Q36 30 60 28 Q84 30 86 55 Q80 42 60 40 Q40 42 34 55Z" fill="#2D1B0E" />
    {/* Ears */}
    <ellipse cx="34" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    <ellipse cx="86" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    {/* Eyes */}
    <ellipse cx="50" cy="62" rx="4" ry="4.5" fill="white" />
    <ellipse cx="70" cy="62" rx="4" ry="4.5" fill="white" />
    <circle cx="51" cy="63" r="2.5" fill="#2D1B0E" />
    <circle cx="71" cy="63" r="2.5" fill="#2D1B0E" />
    <circle cx="52" cy="62" r="0.8" fill="white" />
    <circle cx="72" cy="62" r="0.8" fill="white" />
    {/* Eyebrows */}
    <path d="M45 56 Q50 53 55 56" stroke="#2D1B0E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M65 56 Q70 53 75 56" stroke="#2D1B0E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    {/* Nose */}
    <path d="M58 68 Q60 72 62 68" stroke="#E8956A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Smile */}
    <path d="M52 76 Q60 82 68 76" stroke="#C97040" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Beard */}
    <path d="M40 78 Q44 85 60 86 Q76 85 80 78 Q75 90 60 91 Q45 90 40 78Z" fill="#2D1B0E" opacity="0.7" />
  </svg>
);

const AvatarArman = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#FDF2F8" />
    <rect x="50" y="80" width="20" height="16" rx="4" fill="#F4A76F" />
    <path d="M20 120 Q30 95 60 93 Q90 95 100 120Z" fill="#E84393" />
    <ellipse cx="60" cy="62" rx="26" ry="28" fill="#F4A76F" />
    {/* Lighter brown hair */}
    <path d="M34 58 Q34 30 60 28 Q86 30 86 58 Q82 38 60 36 Q38 38 34 58Z" fill="#7B4F2E" />
    {/* Side part */}
    <path d="M38 42 Q48 34 60 33" stroke="#9B6A40" strokeWidth="2" strokeLinecap="round" fill="none" />
    <ellipse cx="34" cy="63" rx="4" ry="5" fill="#F4A76F" />
    <ellipse cx="86" cy="63" rx="4" ry="5" fill="#F4A76F" />
    <ellipse cx="50" cy="62" rx="4" ry="4.5" fill="white" />
    <ellipse cx="70" cy="62" rx="4" ry="4.5" fill="white" />
    <circle cx="51" cy="63" r="2.5" fill="#3B2A1A" />
    <circle cx="71" cy="63" r="2.5" fill="#3B2A1A" />
    <circle cx="52" cy="62" r="0.8" fill="white" />
    <circle cx="72" cy="62" r="0.8" fill="white" />
    <path d="M45 56 Q50 54 55 56" stroke="#7B4F2E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M65 56 Q70 54 75 56" stroke="#7B4F2E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M58 68 Q60 72 62 68" stroke="#D4845A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M52 76 Q60 81 68 76" stroke="#B5622A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Glasses */}
    <rect x="44" y="57" width="13" height="10" rx="4" stroke="#5B5FEF" strokeWidth="1.5" fill="none" opacity="0.8" />
    <rect x="63" y="57" width="13" height="10" rx="4" stroke="#5B5FEF" strokeWidth="1.5" fill="none" opacity="0.8" />
    <line x1="57" y1="62" x2="63" y2="62" stroke="#5B5FEF" strokeWidth="1.5" />
    <line x1="34" y1="62" x2="44" y2="62" stroke="#5B5FEF" strokeWidth="1.5" />
    <line x1="76" y1="62" x2="86" y2="62" stroke="#5B5FEF" strokeWidth="1.5" />
  </svg>
);

const AvatarNurlan = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#ECFDF5" />
    <rect x="50" y="80" width="20" height="16" rx="4" fill="#FBBF8A" />
    <path d="M20 120 Q30 95 60 93 Q90 95 100 120Z" fill="#10B981" />
    <ellipse cx="60" cy="62" rx="26" ry="28" fill="#FBBF8A" />
    {/* Short dark hair, flat top */}
    <path d="M34 56 Q36 30 60 29 Q84 30 86 56 Q83 36 60 35 Q37 36 34 56Z" fill="#1A0A00" />
    <ellipse cx="34" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    <ellipse cx="86" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    <ellipse cx="50" cy="62" rx="4" ry="4.5" fill="white" />
    <ellipse cx="70" cy="62" rx="4" ry="4.5" fill="white" />
    <circle cx="51" cy="63" r="2.5" fill="#1A0A00" />
    <circle cx="71" cy="63" r="2.5" fill="#1A0A00" />
    <circle cx="52" cy="62" r="0.8" fill="white" />
    <circle cx="72" cy="62" r="0.8" fill="white" />
    <path d="M45 55 Q50 52 55 55" stroke="#1A0A00" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M65 55 Q70 52 75 55" stroke="#1A0A00" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M58 68 Q60 72 62 68" stroke="#E8956A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Bigger smile */}
    <path d="M51 75 Q60 83 69 75" stroke="#C97040" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    {/* Cheeks */}
    <ellipse cx="44" cy="72" rx="5" ry="3" fill="#F4A4A4" opacity="0.4" />
    <ellipse cx="76" cy="72" rx="5" ry="3" fill="#F4A4A4" opacity="0.4" />
  </svg>
);

const AvatarAigerim = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#FFF7ED" />
    <rect x="50" y="80" width="20" height="16" rx="4" fill="#FBBF8A" />
    <path d="M20 120 Q30 95 60 93 Q90 95 100 120Z" fill="#F59E0B" />
    <ellipse cx="60" cy="63" rx="26" ry="28" fill="#FBBF8A" />
    {/* Long dark hair — behind head */}
    <path d="M34 55 Q32 75 33 100 Q40 108 50 108 L50 90 Q38 88 36 75 Q36 60 34 55Z" fill="#1A0A00" />
    <path d="M86 55 Q88 75 87 100 Q80 108 70 108 L70 90 Q82 88 84 75 Q84 60 86 55Z" fill="#1A0A00" />
    {/* Hair top */}
    <path d="M34 56 Q34 28 60 26 Q86 28 86 56 Q82 36 60 34 Q38 36 34 56Z" fill="#1A0A00" />
    {/* Hair highlight */}
    <path d="M44 30 Q52 26 62 27" stroke="#3D1F00" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
    <ellipse cx="34" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    <ellipse cx="86" cy="63" rx="4" ry="5" fill="#FBBF8A" />
    {/* Eyes — slightly larger, feminine */}
    <ellipse cx="50" cy="62" rx="4.5" ry="5" fill="white" />
    <ellipse cx="70" cy="62" rx="4.5" ry="5" fill="white" />
    <circle cx="51" cy="63" r="3" fill="#2D1B0E" />
    <circle cx="71" cy="63" r="3" fill="#2D1B0E" />
    <circle cx="52" cy="61.5" r="1" fill="white" />
    <circle cx="72" cy="61.5" r="1" fill="white" />
    {/* Lashes */}
    <path d="M45 57 Q50 53 55 57" stroke="#1A0A00" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M65 57 Q70 53 75 57" stroke="#1A0A00" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    <path d="M45 57 L43 54" stroke="#1A0A00" strokeWidth="1" strokeLinecap="round" />
    <path d="M55 57 L56 54" stroke="#1A0A00" strokeWidth="1" strokeLinecap="round" />
    <path d="M65 57 L64 54" stroke="#1A0A00" strokeWidth="1" strokeLinecap="round" />
    <path d="M75 57 L77 54" stroke="#1A0A00" strokeWidth="1" strokeLinecap="round" />
    <path d="M58 69 Q60 73 62 69" stroke="#D4845A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    {/* Lips with pink */}
    <path d="M52 76 Q56 80 60 78 Q64 80 68 76 Q64 83 60 83 Q56 83 52 76Z" fill="#F472B6" opacity="0.8" />
    {/* Cheeks */}
    <ellipse cx="43" cy="72" rx="6" ry="3.5" fill="#F472B6" opacity="0.25" />
    <ellipse cx="77" cy="72" rx="6" ry="3.5" fill="#F472B6" opacity="0.25" />
    {/* Earrings */}
    <circle cx="34" cy="70" r="2.5" fill="#F59E0B" />
    <circle cx="86" cy="70" r="2.5" fill="#F59E0B" />
  </svg>
);

const AvatarTimur = () => (
  <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="60" cy="60" r="60" fill="#EEF2FF" />
    <rect x="50" y="80" width="20" height="16" rx="4" fill="#F4A76F" />
    <path d="M20 120 Q30 95 60 93 Q90 95 100 120Z" fill="#8B5CF6" />
    <ellipse cx="60" cy="62" rx="26" ry="28" fill="#F4A76F" />
    {/* Curly hair */}
    <path d="M34 56 Q34 30 60 28 Q86 30 86 56 Q83 38 60 36 Q37 38 34 56Z" fill="#4A2C0A" />
    <circle cx="38" cy="48" r="7" fill="#4A2C0A" />
    <circle cx="48" cy="38" r="7" fill="#4A2C0A" />
    <circle cx="60" cy="34" r="7" fill="#4A2C0A" />
    <circle cx="72" cy="38" r="7" fill="#4A2C0A" />
    <circle cx="82" cy="48" r="7" fill="#4A2C0A" />
    <ellipse cx="34" cy="63" rx="4" ry="5" fill="#F4A76F" />
    <ellipse cx="86" cy="63" rx="4" ry="5" fill="#F4A76F" />
    <ellipse cx="50" cy="62" rx="4" ry="4.5" fill="white" />
    <ellipse cx="70" cy="62" rx="4" ry="4.5" fill="white" />
    <circle cx="51" cy="63" r="2.5" fill="#4A2C0A" />
    <circle cx="71" cy="63" r="2.5" fill="#4A2C0A" />
    <circle cx="52" cy="62" r="0.8" fill="white" />
    <circle cx="72" cy="62" r="0.8" fill="white" />
    <path d="M45 56 Q50 53 55 56" stroke="#4A2C0A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M65 56 Q70 53 75 56" stroke="#4A2C0A" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M58 68 Q60 72 62 68" stroke="#D4845A" strokeWidth="1.2" strokeLinecap="round" fill="none" />
    <path d="M52 76 Q60 82 68 76" stroke="#B5622A" strokeWidth="1.5" strokeLinecap="round" fill="none" />
    {/* Stubble */}
    <path d="M42 78 Q50 83 60 84 Q70 83 78 78" stroke="#4A2C0A" strokeWidth="0.8" strokeLinecap="round" fill="none" opacity="0.5" />
  </svg>
);

const AVATARS = [AvatarDamir, AvatarArman, AvatarNurlan, AvatarAigerim, AvatarTimur];
const DOTS = ["bg-[#5B5FEF]", "bg-[#E84393]", "bg-emerald-500", "bg-amber-500", "bg-violet-500"];

export function TeamSection(): React.ReactElement {
  const { t } = useT();
  const team = t.team.members as { name: string; role: string }[];

  return (
    <section className="py-14 lg:py-20 bg-lavender relative overflow-hidden">
      <div className="blob blob-md absolute -right-20 top-1/2 -translate-y-1/2 opacity-60" />

      <div className="container-atlantis relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="text-center mb-10"
        >
          <span className="text-label text-[#E84393] block mb-3">{t.team.label}</span>
          <h2 className="display-section">{t.team.heading}</h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {team.map((member, i) => {
            const Avatar = AVATARS[i];
            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease }}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center gap-3 p-3 w-[150px]"
              >
                {/* Avatar circle */}
                <div className="w-20 h-20 rounded-full overflow-hidden shadow-md">
                  <Avatar />
                </div>

                {/* Name + role */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1.5 mb-0.5">
                    <span className={`w-2 h-2 rounded-full ${DOTS[i]} shrink-0`} />
                    <p className="text-sm font-bold text-slate-800 dark:text-white">{member.name}</p>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-300 leading-snug">{member.role}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
