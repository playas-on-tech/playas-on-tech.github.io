// Floating gradient field behind the dark hero sections.
export default function Blobs({
  id,
  dim = false,
  className = "blobs cine-field",
}: {
  id?: string;
  dim?: boolean;
  className?: string;
}) {
  return (
    <div id={id} className={className}>
      <span className="blob blob-teal" />
      <span className="blob blob-ocean" />
      <span className="blob blob-aqua" />
      <span className="blob blob-sunset" style={dim ? { opacity: 0.2 } : undefined} />
    </div>
  );
}
