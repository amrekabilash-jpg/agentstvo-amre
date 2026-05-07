"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import type { CaseItem } from "@/data/cases";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export function CaseCard({ item, index }: { item: CaseItem; index: number }): React.ReactElement {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1, ease }}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-[0_2px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.10)] transition-shadow duration-500"
    >
      {/* Browser mockup */}
      <div className="relative">
        {/* Chrome bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-100">
          <span className="w-3 h-3 rounded-full bg-red-400" />
          <span className="w-3 h-3 rounded-full bg-yellow-400" />
          <span className="w-3 h-3 rounded-full bg-green-400" />
          <div className="flex-1 ml-2 bg-white rounded-full px-3 py-1 text-xs text-gray-400 font-mono truncate border border-gray-200">
            {item.url}
          </div>
        </div>

        {/* Preview area */}
        <div className={`relative h-48 bg-gradient-to-br ${item.gradient} overflow-hidden`}>
          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          {/* Floating circles */}
          <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white/10" />
          {/* Client initials */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="block text-white/30 text-xs font-mono uppercase tracking-widest mb-2">
                {item.category}
              </span>
              <span className="block text-white font-extrabold text-4xl tracking-tight leading-none">
                {item.client.split(" ")[0]}
              </span>
            </div>
          </div>
          {/* Live badge */}
          <a
            href={`https://${item.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/30 hover:bg-white/30 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live
            <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        {/* Category tag */}
        <span
          className="inline-block self-start text-xs font-semibold px-3 py-1 rounded-full mb-3"
          style={{ background: `${item.accentColor}15`, color: item.accentColor }}
        >
          {item.category}
        </span>

        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-[#5B5FEF] transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-4 flex-1">
          {item.description}
        </p>

        {/* Results row */}
        <div className="flex gap-4 mb-4 py-3 border-t border-b border-gray-100">
          {item.results.map((r) => (
            <div key={r.label} className="text-center flex-1">
              <span className="block text-sm font-bold text-gray-900">{r.value}</span>
              <span className="block text-xs text-gray-400">{r.label}</span>
            </div>
          ))}
        </div>

        {/* Services */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {item.services.map((s) => (
            <span
              key={s}
              className="text-xs font-medium px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100"
            >
              {s}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-400 font-mono">{item.client}</span>
          <a
            href={`https://${item.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-semibold transition-colors"
            style={{ color: item.accentColor }}
          >
            Смотреть сайт
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
