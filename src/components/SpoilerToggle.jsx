import { useState } from "react"

export default function CollapseBox({
    title = "Toggle",
    children,
    defaultOpen = false
}) {
    const [open, setOpen] = useState(defaultOpen)

    return (
        <div className="rounded-xl overflow-hidden">

            {/* Header */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-2 transition"
            >
                <span className="font-serif text-ink-900">
                    {open ? `▼ ${title}` : `▶ ${title}`}
                </span>

                <span className="text-bark-400 text-sm">
                </span>
            </button>

            {/* Content */}
            <div
                className={`px-7 overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[1000px] py-2" : "max-h-0 py-0"
                    }`}
            >
                <div className="prose prose-neutral max-w-none prose-p:mb-4 text-justify text-bark-600">
                    {children}
                </div>
            </div>
        </div>
    )
}