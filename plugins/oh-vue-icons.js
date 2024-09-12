import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaBicycle,
  FaLandmark,
  FaGlobeAmericas,
  FaHeartbeat,
  FaHome,
  FaMoneyBillWave,
  FaQuestion,
  FaUserGraduate,
  FaShieldAlt,
} from "oh-vue-icons/icons";

addIcons(
  FaBicycle,
  FaLandmark,
  FaGlobeAmericas,
  FaHeartbeat,
  FaHome,
  FaMoneyBillWave,
  FaQuestion,
  FaUserGraduate,
  FaShieldAlt
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("v-icon", OhVueIcon); // Registrando globalmente o componente de ícone
});
