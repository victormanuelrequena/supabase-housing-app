"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { storage } from "@/utils/storage";
import { supabase } from "@/utils/supabase";

interface ViviendaData {
  numero_viviendas: string;
  residencia_anterior: string;
  tipo_vivienda: string;
  tenencia_vivienda: string;
  tipo_techo: string;
}

export default function Datos() {
  const [viviendas, setViviendas] = useState<ViviendaData[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        // @ts-ignore
      } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
      } else {
        fetchData();
      }
    };

    const fetchData = async () => {
      const data = await storage.getViviendas();
      setViviendas(data);
      setLoading(false);
    };

    checkSession();
  }, [router]);

  const handleLogout = async () => {
    // @ts-ignore
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (loading) {
    return <div className="text-center mt-8">Cargando...</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Datos de Viviendas
      </h1>
      <button
        onClick={handleLogout}
        className="mb-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
      >
        Cerrar Sesión
      </button>
      {viviendas.length === 0 ? (
        <p className="text-center">No hay datos de viviendas guardados.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Número de Viviendas</th>
                <th className="px-4 py-2">Residencia Anterior</th>
                <th className="px-4 py-2">Tipo de Vivienda</th>
                <th className="px-4 py-2">Tenencia de Vivienda</th>
                <th className="px-4 py-2">Tipo de Techo</th>
              </tr>
            </thead>
            <tbody>
              {viviendas.map((vivienda, index) => (
                <tr
                  key={index}
                  className={index % 2 === 0 ? "bg-gray-100" : ""}
                >
                  <td className="border px-4 py-2">
                    {vivienda.numero_viviendas}
                  </td>
                  <td className="border px-4 py-2">
                    {vivienda.residencia_anterior}
                  </td>
                  <td className="border px-4 py-2">{vivienda.tipo_vivienda}</td>
                  <td className="border px-4 py-2">
                    {vivienda.tenencia_vivienda}
                  </td>
                  <td className="border px-4 py-2">{vivienda.tipo_techo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
