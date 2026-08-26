import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);


function horaMinuto(time) {
    if (!time || !/^\d{2}:\d{2}$/.test(time)) {
        return NaN;
    }

    const [hora, minuto] = time.split(":").map(Number);

    if (hora > 23 || minuto > 59) {
        return NaN;
    }

    return hora * 60 + minuto;
}


export const verifyTime = (horaInicio, horaFim) => {

    const minutosInicio = horaMinuto(horaInicio);
    const minutosFim = horaMinuto(horaFim);

    if (
        Number.isNaN(minutosInicio) ||
        Number.isNaN(minutosFim)
    ) {
        return {
            isValid: false,
            message: "Formato de hora inválido. Use HH:mm"
        };
    }

    if (minutosInicio >= minutosFim) {
        return {
            isValid: false,
            message: "A hora de início deve ser anterior à hora de fim"
        };
    }

    return {
        isValid: true
    };
};