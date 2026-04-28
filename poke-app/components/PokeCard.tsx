type Props = {
  data: any
}

export default function PokemonCard({ data }: Props) {
  return (
    <div className="border border-gray-300 rounded-xl shadow-md p-6 max-w-sm mx-auto bg-gray-50 text-gray-900">
      <h2 className="text-2xl font-bold capitalize text-center mb-4">
        {data.name}
      </h2>

      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="mx-auto w-32 h-32"
      />

      <div className="mt-4 space-y-2 text-lg">
        <p>
          <span className="font-semibold">Height:</span> {data.height}
        </p>

        <p>
          <span className="font-semibold">Weight:</span> {data.weight}
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {data.types.map((t: any) => t.type.name).join(", ")}
        </p>
      </div>
    </div>
  )
}