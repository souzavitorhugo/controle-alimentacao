export const API_URL = "https://devcontroleveterinario.azurewebsites.net";

export const defaults = {
    headers: {
        "Content-Type": "application/json",
    }
};

export function srid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }  
    return `${s4()}-${s4()}-${s4()}`;
  }

