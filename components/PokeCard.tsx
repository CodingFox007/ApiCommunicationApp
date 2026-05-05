type Props = {
  data: any
}

export default function PokemonCard({ data }: Props) {
  const heightMeters = data.height / 10
  const weightKg = data.weight / 10

  const heightInches = Math.round(heightMeters * 39.3701)
  const feet = Math.floor(heightInches / 12)
  const inches = heightInches % 12

  const weightLbs = (weightKg * 2.20462).toFixed(1)

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
          <span className="font-semibold">Height:</span>{" "}
          {heightMeters.toFixed(1)} m ({feet}'{inches}")
        </p>

        <p>
          <span className="font-semibold">Weight:</span>{" "}
          {weightKg.toFixed(1)} kg ({weightLbs} lbs)
        </p>

        <p>
          <span className="font-semibold">Type:</span>{" "}
          {data.types.map((t: any) => t.type.name).join(", ")}
        </p>
        <p>
          <span className="font-semibold">Abilities:</span>{" "}
          {data.abilities
            .map((a: any) => a.ability.name)
            .join(", ")}
        </p>
        <p>
          <span className="font-semibold">Base Stats:</span>
          <ul className="list-disc list-inside">
            {data.stats.map((s: any) => (
              <li key={s.stat.name}>
                <span className="font-medium">{s.stat.name}:</span> {s.base_stat}
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  )
}