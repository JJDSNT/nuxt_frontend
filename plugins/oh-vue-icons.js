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
  FaGithub,
  FaLinkedin,
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
  FaShieldAlt,
  FaGithub,
  FaLinkedin,
);

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component("v-icon", OhVueIcon); // Registrando globalmente o componente de ícone
});
