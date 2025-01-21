"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HomeIcon, MapPinIcon, BuildingOfficeIcon, KeyIcon, SwatchIcon } from "@heroicons/react/24/solid"
import { storage } from "@/utils/storage"
import { isSupabaseConnected } from "@/utils/supabase"

export default function Vivienda() {
  const [numeroViviendas, setNumeroViviendas] = useState("")
  const [residenciaAnterior, setResidenciaAnterior] = useState("")
  const [tipoVivienda, setTipoVivienda] = useState("")
  const [tenenciaVivienda, setTenenciaVivienda] = useState("")
  const [tipoTecho, setTipoTecho] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const result = await storage.saveVivienda({
        numero_viviendas: numeroViviendas,
        residencia_anterior: residenciaAnterior,
        tipo_vivienda: tipoVivienda,
        tenencia_vivienda: tenenciaVivienda,
        tipo_techo: tipoTecho,
      })
      if (result.success) {
        alert(
          result.local || !isSupabaseConnected
            ? "Datos guardados localmente. Se sincronizarán cuando haya conexión."
            : "Datos guardados exitosamente en Supabase",
        )
        // Limpiar el formulario
        setNumeroViviendas("")
        setResidenciaAnterior("")
        setTipoVivienda("")
        setTenenciaVivienda("")
        setTipoTecho("")
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error)
      alert("Error al guardar los datos. Por favor, intenta de nuevo.")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">Datos de Vivienda</h1>
      {!isSupabaseConnected && (
        <p className="mb-4 text-yellow-600 text-center">
          No se pudo conectar a Supabase. Los datos se guardarán localmente.
        </p>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="numeroViviendas" className="block mb-1 font-medium">
            <HomeIcon className="inline w-5 h-5 mr-2" />
            Número de viviendas
          </label>
          <input
            type="number"
            id="numeroViviendas"
            value={numeroViviendas}
            onChange={(e) => setNumeroViviendas(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="residenciaAnterior" className="block mb-1 font-medium">
            <MapPinIcon className="inline w-5 h-5 mr-2" />
            Residencia Anterior
          </label>
          <select
            id="residenciaAnterior"
            value={residenciaAnterior}
            onChange={(e) => setResidenciaAnterior(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="misma_comunidad">En la misma comunidad</option>
            <option value="otra_comunidad">En otra comunidad</option>
            <option value="otro_estado">En otro estado</option>
            <option value="otro_pais">En otro país</option>
            <option value="sin_informacion">Sin información</option>
          </select>
        </div>
        <div>
          <label htmlFor="tipoVivienda" className="block mb-1 font-medium">
            <BuildingOfficeIcon className="inline w-5 h-5 mr-2" />
            Tipo de vivienda
          </label>
          <select
            id="tipoVivienda"
            value={tipoVivienda}
            onChange={(e) => setTipoVivienda(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="casa">Casa</option>
            <option value="casa_vecindad">Casa de vecindad</option>
            <option value="apartamento">Apartamento en edificio</option>
            <option value="rancho">Rancho</option>
            <option value="casa_quinta">Casa quinta</option>
            <option value="sin_informacion">Sin información</option>
          </select>
        </div>
        <div>
          <label htmlFor="tenenciaVivienda" className="block mb-1 font-medium">
            <KeyIcon className="inline w-5 h-5 mr-2" />
            Tenencia de la vivienda
          </label>
          <select
            id="tenenciaVivienda"
            value={tenenciaVivienda}
            onChange={(e) => setTenenciaVivienda(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="propia">Propia</option>
            <option value="alquilada">Alquilada</option>
            <option value="hipotecada">Hipotecada</option>
            <option value="prestada">Prestada</option>
          </select>
        </div>
        <div>
          <label htmlFor="tipoTecho" className="block mb-1 font-medium">
            <SwatchIcon className="inline w-5 h-5 mr-2" />
            Tipo de techo
          </label>
          <select
            id="tipoTecho"
            value={tipoTecho}
            onChange={(e) => setTipoTecho(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Seleccione una opción</option>
            <option value="platabanda">Platabanda</option>
            <option value="tejas">Tejas</option>
            <option value="laminas_metalicas">Láminas metálicas</option>
            <option value="laminas_asfalticas">Láminas asfálticas</option>
          </select>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Guardar Datos
        </motion.button>
      </form>
    </motion.div>
  )
}

