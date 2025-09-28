export default function BookGallery({
  images = [],
  selected = 0,
  setSelected,
}) {
  return (
    <div>
      <div className="relative rounded-md overflow-hidden border-2 border-gray-700">
        <img
          src={images[selected]}
          alt={`preview-${selected}`}
          className="w-full h-[420px] object-cover"
        />
      </div>

      <div className="mt-3 flex gap-3">
        {images.map((src, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(idx)}
            className={`w-20 h-14 rounded-md overflow-hidden border-2 ${
              selected === idx ? "border-teal-400" : "border-transparent"
            } focus:outline-none`}
          >
            <img
              src={src}
              alt={`thumb-${idx}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
