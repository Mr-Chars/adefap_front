export const REGEX_TYPES = {
    email: '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$',
    number: '^[0-9]*$',
    dni: '^[0-9]{1,8}$',
    peso: '^[0-9]{1,3}$',
};

export const lastYears = (startYear: number) => {
    var currentYear = new Date().getFullYear(), years = [];
    startYear = startYear || 1980;
    while (startYear <= currentYear) {
        years.push(currentYear--);
    }
    return years;
}

export const ROLS = [
    {
        id: 1,
        name: 'Administrador',
    },
    {
        id: 2,
        name: 'Digitador',
    }
]