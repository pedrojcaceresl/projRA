interface PartInfo {
  id: string
  name: string
  description: string
}

interface ModelInfoProps {
  part: PartInfo
}

export default function ModelInfo({ part }: ModelInfoProps) {
  return (
    <div className="border-t pt-4">
      <h3 className="text-xl font-semibold mb-2">{part.name}</h3>
      <p className="text-gray-600 mb-4">{part.description}</p>

      <div className="space-y-4">
        <div>
          <h4 className="font-medium text-gray-800 mb-1">Funciones principales:</h4>
          <ul className="list-disc pl-5 text-gray-600">
            {part.id === "frontal" && (
              <>
                <li>Control de funciones ejecutivas</li>
                <li>Toma de decisiones</li>
                <li>Regulación del comportamiento</li>
                <li>Expresión del lenguaje</li>
              </>
            )}
            {part.id === "parietal" && (
              <>
                <li>Procesamiento sensorial</li>
                <li>Orientación espacial</li>
                <li>Reconocimiento</li>
                <li>Percepción del dolor</li>
              </>
            )}
            {part.id === "temporal" && (
              <>
                <li>Procesamiento auditivo</li>
                <li>Comprensión del lenguaje</li>
                <li>Formación de memoria</li>
                <li>Reconocimiento de objetos</li>
              </>
            )}
            {part.id === "occipital" && (
              <>
                <li>Procesamiento visual</li>
                <li>Reconocimiento de colores</li>
                <li>Percepción de movimiento</li>
                <li>Reconocimiento de formas</li>
              </>
            )}
            {part.id === "cerebellum" && (
              <>
                <li>Coordinación motora</li>
                <li>Equilibrio</li>
                <li>Postura</li>
                <li>Aprendizaje motor</li>
              </>
            )}
          </ul>
        </div>

        <div>
          <h4 className="font-medium text-gray-800 mb-1">Datos interesantes:</h4>
          <p className="text-gray-600">
            {part.id === "frontal" &&
              "El lóbulo frontal es la región más grande del cerebro humano y es la última en desarrollarse completamente, alrededor de los 25 años de edad."}
            {part.id === "parietal" &&
              "El lóbulo parietal integra información sensorial de diferentes modalidades, permitiéndonos crear una representación coherente del mundo."}
            {part.id === "temporal" &&
              "El lóbulo temporal contiene el hipocampo, crucial para la formación de nuevos recuerdos."}
            {part.id === "occipital" &&
              "El lóbulo occipital puede procesar imágenes en milisegundos, permitiendo una rápida identificación de objetos y peligros."}
            {part.id === "cerebellum" &&
              "Aunque el cerebelo representa solo el 10% del volumen cerebral, contiene más del 50% de todas las neuronas del cerebro."}
          </p>
        </div>
      </div>
    </div>
  )
}

