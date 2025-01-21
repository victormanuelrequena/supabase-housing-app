"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  UserIcon,
  LockClosedIcon,
  HomeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  KeyIcon,
  SwatchIcon,
} from "@heroicons/react/24/solid";
import { supabase } from "@/utils/supabase";
import { storage } from "@/utils/storage";

export default function Registro() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [numeroViviendas, setNumeroViviendas] = useState("");
  const [residenciaAnterior, setResidenciaAnterior] = useState("");
  const [tipoVivienda, setTipoVivienda] = useState("");
  const [tenenciaVivienda, setTenenciaVivienda] = useState("");
  const [tipoTecho, setTipoTecho] = useState("");
  const router = useRouter();

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // @ts-ignore
      const { error: authError } = await supabase?.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
          },
        },
      });
      if (authError) {
        // Si hay un error en el registro, guardar en local storage
        const viviendaData = {
          numero_viviendas: numeroViviendas,
          residencia_anterior: residenciaAnterior,
          tipo_vivienda: tipoVivienda,
          tenencia_vivienda: tenenciaVivienda,
          tipo_techo: tipoTecho,
        };

        // Guardar datos en local storage
        localStorage.setItem("viviendaData", JSON.stringify(viviendaData));

        alert("Error al registrarse en Supabase. Datos guardados localmente.");
        return; // Salir de la función
      }

      const viviendaData = {
        numero_viviendas: numeroViviendas,
        residencia_anterior: residenciaAnterior,
        tipo_vivienda: tipoVivienda,
        tenencia_vivienda: tenenciaVivienda,
        tipo_techo: tipoTecho,
      };

      const { success, local } = await storage.saveVivienda(viviendaData);

      if (success) {
        alert(
          local
            ? "Registro exitoso. Datos de vivienda guardados localmente."
            : "Registro exitoso. Datos de vivienda guardados en Supabase."
        );
        router.push("/login");
      } else {
        throw new Error("Error al guardar los datos de vivienda");
      }
    } catch (error) {
      console.error("Error al registrarse:", error);
      alert("Error al registrarse. Por favor, intenta de nuevo.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h1 className="text-2xl font-bold mb-6 text-center">
        Registro y Datos de Vivienda
      </h1>
      <form onSubmit={handleRegistro} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              <EnvelopeIcon className="inline w-5 h-5 mr-2" />
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">
              <UserIcon className="inline w-5 h-5 mr-2" />
              Usuario
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              <LockClosedIcon className="inline w-5 h-5 mr-2" />
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
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
            <label
              htmlFor="residenciaAnterior"
              className="block mb-1 font-medium"
            >
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
            <label
              htmlFor="tenenciaVivienda"
              className="block mb-1 font-medium"
            >
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
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Registrarse
        </button>
      </form>
    </motion.div>
  );
}
