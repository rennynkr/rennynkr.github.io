import { Link } from "react-router-dom"

export default function TableOfContents({ chapters = [], bookId }) {
    if (!chapters?.length) return null

    // chia group 10 chapter
    const groups = []
    for (let i = 0; i < chapters.length; i += 10) {
        groups.push(chapters.slice(i, i + 10))
    }

    return (
        <div className="flex flex-col mt-6 w-full  border-t-2 border-b-2 border-cream-200 pt-12 pb-12">

            <p className="text-center text-bark-800 font-serif mb-10 font-semibold text-3xl tracking-wide">
                MỤC LỤC:
            </p>

            <div className="flex flex-col items-center justify-center gap-10">

                {groups.map((group, gi) => (
                    <div
                        key={gi}
                        className={`flex flex-col gap-2 w-2/3  ${gi % 2 === 0 ? "items-start" : "items-end"
                            }`}
                    >
                        {/* Chapters */}
                        <div className="flex flex-col gap-2">
                            {group.map((ch) => (
                                <Link
                                    key={ch.id}
                                    to={`/book/${bookId}/chapter/${ch.id}`}
                                    className="group flex items-center gap-2 text-bark-600 hover:text-bark-800 transition pl-4 border-solid border-l-1 border-cream-200"
                                >

                                    <span className="font-sans text-justify">
                                        {ch.title}
                                    </span>
                                </Link>
                            ))}
                        </div>

                    </div>
                ))}

            </div>
        </div>
    )
}