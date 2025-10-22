"use client"
/*start*/
import { useState } from "react"

type Tag = {
  id: string
  text: string
  color: string
  align: "left" | "center" | "right"
}

export default function Home() {
  const [tags, setTags] = useState<Tag[]>([{ id: "1", text: "Hello world!", color: "#000000", align: "center" }])
  const [selectedId, setSelectedId] = useState<string>("")
  const [text, setText] = useState("")
  const [color, setColor] = useState("#000000")
  const [align, setAlign] = useState<"left" | "center" | "right">("left")

  function Change_tag(id: string) {
    setSelectedId(id)
    const tag = tags.find(t => t.id === id)
    if (tag) {
      setText(tag.text)
      setColor(tag.color)
      setAlign(tag.align)
    }
  }

  function okChange() {
    if (!selectedId) return
    setTags(prev =>
      prev.map(t =>
        t.id === selectedId ? { ...t, text: text, color: color, align: align } : t
      )
    )
  }

  function deleteElement() {
    if (!selectedId) return
    setTags(prev => prev.filter(t => t.id !== selectedId))
    setSelectedId("")
    setText("")
    setColor("#000000")
    setAlign("left")
  }

  function addTag() {
    const newId = String(tags.length ? Number(tags[tags.length - 1].id) + 1 : 1)
    setTags(prev => [...prev, { id: newId, text: "Hello world!", color: "#000000", align: "center" }])
  }

  return (
    <div className="flex flex-col md:flex-row w-screen h-screen">
      <div className="w-full md:w-9/12 h-7/12 md:h-full overflow-y-auto " style={{ backgroundColor: "#ecf0f1" }}>
        {tags.map(tag => (
          <h1
            key={tag.id}
            onClick={() => Change_tag(tag.id)}
            className="cursor-pointer"
            style={{ color: tag.color, textAlign: tag.align }}
          >
            {tag.text}
          </h1>
        ))}
        <img
          src="/add.png"
          className="w-14 mx-auto cursor-pointer mt-5"
          onClick={addTag}
        />
      </div>

      <div className="fixed bottom-0 flex flex-col p-5 h-5/12 bg-white w-full justify-center md:w-3/12 md:right-0 md:top-0">
        <h2 className="text-xl">text:</h2>
        <input
          className="border-2 border-gray-500 rounded-md h-10 text-2xl pl-2 w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <h2 className="text-xl mt-2">color:</h2>
        <div className="flex items-center justify-center gap-2 w-full">
          <input
            className="h-10 rounded-l-md border-2 flex-1"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <input
            type="color"
            className="h-12 w-12 rounded-r-md"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <h2 className="text-xl mt-2">alignment:</h2>
        <select
          className="border-2 border-gray-500 rounded-md h-10 pl-2 w-full"
          value={align}
          onChange={(e) => setAlign(e.target.value as "left" | "center" | "right")}
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>

        <div className="flex mt-2 gap-2">
          <button
            className="border-2 rounded-md border-gray-500 w-20 text-xl"
            onClick={okChange}
          >
            change
          </button>
          <button
            className="border-2 rounded-md border-gray-500 w-20 text-xl"
            onClick={deleteElement}
          >
            delete
          </button>
        </div>
      </div>
    </div>
  )
}
