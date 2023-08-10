import { v4 as uuidv4 } from "uuid";
export const roomsData = [
  {
    id: "A1",
    maxOccupancy: 1,
    availableServices: [1, 2],
  },
  {
    id: "A2",
    maxOccupancy: 2,
    availableServices: [1, 3],
  },
  {
    id: "B1",
    maxOccupancy: 1,
    availableServices: [2, 4],
  },
  {
    id: "B2",
    maxOccupancy: 2,
    availableServices: [3, 4],
  },
];

export const servicesData = [
  {
    id: "A1",
    servicios: [
      {
        uui: uuidv4(),
        img: "",
        name: "Desayuno",
        description: "Un delicioso desayuno buffet.",
        cost: 15,
      },
      {
        uui: uuidv4(),
        img: "https://cdn.aarp.net/content/dam/aarp/food/recipes/2018/10/1140-limofresa-gas-drink-esp.jpg",
        name: "Servicio de bebidas",
        description: "Variedad de bebidas para su disfrute.",
        cost: 8,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Acceso al spa",
        description: "Relájese y disfrute de nuestro spa.",
        cost: 20,
      },
      {
        uui: uuidv4(),
        img: "https://static.vecteezy.com/system/resources/previews/001/369/753/non_2x/table-setting-with-food-and-drink-free-photo.jpg",
        name: "Servicio a la habitación",
        description:
          "Solicite comida y bebidas en la comodidad de su habitación.",
        cost: 12,
      },
    ],
  },
  {
    id: "A2",
    servicios: [
      {
        uui: uuidv4(),

        img: "",
        name: "almuerzo",
        description: "Un delicioso almuerzo buffet.",
        cost: 15,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Servicio de bebidas alcoholicas",
        description: "Variedad de bebidas para su disfrute.",
        cost: 10,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Acceso al spa",
        description: "Relájese y disfrute de nuestro spa.",
        cost: 20,
      },
    ],
  },
  {
    id: "B1",
    servicios: [
      {
        uui: uuidv4(),

        name: "Opción de despertador",
        img: "",
        description:
          "Ya sea mediante una llamada al teléfono de la habitación, un reloj despertador o una llamada a la puerta.",
        cost: 15,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Servicio de bebidas alcoholicas",
        description: "Variedad de bebidas para su disfrute.",
        cost: 10,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Desayuno",
        description: "Un delicioso desayuno buffet.",
        cost: 15,
      },
      {
        uui: uuidv4(),

        img: "https://static.vecteezy.com/system/resources/previews/001/369/753/non_2x/table-setting-with-food-and-drink-free-photo.jpg",

        name: "Servicio a la habitación",
        description:
          "Solicite comida y bebidas en la comodidad de su habitación.",
        cost: 12,
      },
    ],
  },
  {
    id: "B2",
    servicios: [
      {
        uui: uuidv4(),

        img: "",
        name: "Las 3 comidas",
        description:
          "Nada mejor que te lleven a la puerta las 3 comidas del dia ",
        cost: 20,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Servicio de bebidas alcoholicas",
        description: "Variedad de bebidas para su disfrute.",
        cost: 10,
      },
      {
        uui: uuidv4(),

        img: "",
        name: "Acceso al spa",
        description: "Relájese y disfrute de nuestro spa.",
        cost: 20,
      },
      {
        uui: uuidv4(),

        img: "https://static.vecteezy.com/system/resources/previews/001/369/753/non_2x/table-setting-with-food-and-drink-free-photo.jpg",
        name: "Servicio a la habitación",
        description:
          "Solicite comida y bebidas en la comodidad de su habitación.",
        cost: 12,
      },
    ],
  },
];
