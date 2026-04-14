type Props = {
  data: any
}

export default function PokemonCard({ data }: Props) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      marginTop: "1rem",
      borderRadius: "10px",
      maxWidth: "300px"
    }}>
      <h2 style={{ textTransform: "capitalize" }}>
        {data.name}
      </h2>

      <img
        src={data.sprites.front_default}
        alt={data.name}
      />

      <p><strong>Height:</strong> {data.height}</p>
      <p><strong>Weight:</strong> {data.weight}</p>

      <p>
        <strong>Type:</strong>{" "}
        {data.types.map((t: any) => t.type.name).join(", ")}
      </p>
    </div>
  )
}