"use client";
import { useEffect, useState } from "react";

export type DocsNavGroup = { title: string; items: { id: string; title: string }[] };

/** Sticky docs sidebar that highlights the section currently in view. */
export const DocsNav = ({ groups }: { groups: DocsNavGroup[] }) => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = groups.flatMap((g) => g.items.map((i) => i.id));
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActive(top.target.id);
        }
      },
      { rootMargin: "-88px 0px -72% 0px", threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [groups]);

  return (
    <nav className="text-sm">
      {groups.map((g) => (
        <div key={g.title} className="mb-6">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-[#8a8a8a]">
            {g.title}
          </p>
          <ul className="space-y-0.5">
            {g.items.map((i) => (
              <li key={i.id}>
                <a
                  href={`#${i.id}`}
                  className={`block rounded-md px-3 py-1.5 transition-colors ${
                    active === i.id
                      ? "bg-[#e6eef3] font-semibold text-[#003253]"
                      : "text-[#4a4a4a] hover:bg-[#f0f1f3] hover:text-[#003253]"
                  }`}
                >
                  {i.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
};
