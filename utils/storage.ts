import { supabase, isSupabaseConnected } from "./supabase"

interface ViviendaData {
  numero_viviendas: string
  residencia_anterior: string
  tipo_vivienda: string
  tenencia_vivienda: string
  tipo_techo: string
}

export const storage = {
  async saveVivienda(data: ViviendaData) {
    if (isSupabaseConnected && supabase) {
      try {
        const { error } = await supabase.from("viviendas").insert([data])
        if (error) throw error
        return { success: true }
      } catch (error) {
        console.error("Error al guardar en Supabase:", error)
        // Fall through to local storage
      }
    }

    const localData = JSON.parse(localStorage.getItem("viviendas") || "[]")
    localData.push(data)
    localStorage.setItem("viviendas", JSON.stringify(localData))
    return { success: true, local: true }
  },

  async getViviendas() {
    if (isSupabaseConnected && supabase) {
      try {
        const { data, error } = await supabase.from("viviendas").select("*")
        if (error) throw error
        return data
      } catch (error) {
        console.error("Error al obtener datos de Supabase:", error)
        // Fall through to local storage
      }
    }

    const localData = JSON.parse(localStorage.getItem("viviendas") || "[]")
    return localData
  },
}

