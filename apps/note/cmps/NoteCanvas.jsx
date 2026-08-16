// const { useState, useRef, useEffect } = React

// export function NoteCanvas({ onSaveCanvas, initialUrl }) {
//   const canvasRef = useRef(null)
//   const isMouseDownRef = useRef(false)
//   const lastPosRef = useRef({ x: 0, y: 0 })

//   const [brushColor, setBrushColor] = useState('#000000')
//   const [brushSize, setBrushSize] = useState(3)

//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const ctx = canvas.getContext('2d')

//     ctx.fillStyle = '#ffffff'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)

//     if (initialUrl) {
//       const img = new Image()
//       img.src = initialUrl
//       img.onload = () => {
//         ctx.drawImage(img, 0, 0)
//       }
//     }
//   }, [initialUrl])

//   function getPos(e) {
//     return {
//       x: e.nativeEvent.offsetX,
//       y: e.nativeEvent.offsetY,
//     }
//   }

//   function onMouseDown(e) {
//     isMouseDownRef.current = true
//     lastPosRef.current = getPos(e)
//   }

//   function onMouseMove(e) {
//     if (!isMouseDownRef.current) return

//     const canvas = canvasRef.current
//     const ctx = canvas.getContext('2d')
//     const currentPos = getPos(e)

//     ctx.beginPath()
//     ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y)
//     ctx.lineTo(currentPos.x, currentPos.y)

//     ctx.strokeStyle = brushColor
//     ctx.lineWidth = brushSize
//     ctx.lineCap = 'round'
//     ctx.lineJoin = 'round'
//     ctx.stroke()

//     lastPosRef.current = currentPos
//   }

//   function onMouseUp() {
//     isMouseDownRef.current = false
//   }

//   function onClearCanvas() {
//     const canvas = canvasRef.current
//     const ctx = canvas.getContext('2d')
//     ctx.fillStyle = '#ffffff'
//     ctx.fillRect(0, 0, canvas.width, canvas.height)
//   }

//   function handleSave() {
//     const canvas = canvasRef.current
//     const dataUrl = canvas.toDataURL('image/png')
//     if (onSaveCanvas) onSaveCanvas(dataUrl)
//   }

//   return (
//     <div className="note-canvas-editor">
//       <div className="canvas-toolbar">
//         <input
//           type="color"
//           value={brushColor}
//           onChange={(e) => setBrushColor(e.target.value)}
//         />
//         <input
//           type="range"
//           min="1"
//           max="20"
//           value={brushSize}
//           onChange={(e) => setBrushSize(Number(e.target.value))}
//         />
//         <button type="button" onClick={onClearCanvas}>
//           Clear
//         </button>
//         <button type="button" onClick={handleSave}>
//           Save Drawing
//         </button>
//       </div>

//       <canvas
//         ref={canvasRef}
//         width={300}
//         height={300}
//         className="drawing-canvas"
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//         onMouseUp={onMouseUp}
//         onMouseLeave={onMouseUp}
//       />
//     </div>
//   )
// }
// לשים במקום add url  קובץ של תמונה
// לשים בסאקטין 3 עריכה של מחיקה.ו

