const { useRef, useEffect } = React

export function NoteCanvas(props) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, props.width, props.height);

    canvas.addEventListener('click', clickHandler);

    return () => {
      canvas.removeEventListener('click', clickHandler);
    };
  }, []);

  return <canvas ref={canvasRef} width={props.width} height={props.height} />;
}