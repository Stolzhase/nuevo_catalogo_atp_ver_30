import { Product, products } from './products-data';



// Define el tipo para las colecciones agrupadas

export type SeasonalCollections = {

  // La clave es el nombre de la estación (ej: "Verano", "Invierno")

  [season: string]: Product[];

};



/**

 * Agrupa todos los productos por su campo 'COLLECTIONS' (Estación Temática).

 *

 * @returns Un objeto donde las claves son las estaciones y los valores son arrays de productos.

 */

export function groupProductsBySeason(): SeasonalCollections {

  const collections = products.reduce((acc, product) => {

    // Usamos el campo 'season' para la agrupación.

    // Si 'season' es undefined o null, se agrupa como 'Sin Asignar'.

    const seasonKey = product.collection || 'Sin Asignar';



    // Inicializa el array si la clave de la estación aún no existe

    if (!acc[seasonKey]) {

      acc[seasonKey] = [];

    }



    // Añade el producto a la colección de la estación correspondiente

    acc[seasonKey].push(product);



    return acc;

  }, {} as SeasonalCollections);



  // Opcional: Puedes eliminar la colección 'Todo el año' de aquí si quieres

  // mostrarla en un lugar separado.

  return collections;

}



// CÓMO USARLO

/*

import { groupProductsBySeason, SeasonalCollections } from '../lib/collections.ts';



// En el componente de tu página:

const collections: SeasonalCollections = groupProductsBySeason();



// 'collections' ahora se ve así:

// {

//   "Verano": [Margarita Mini, Brote de Menta, Calabaza Zucchini, ...],

//   "Primavera": [Pensamiento Chico, Flor de Miel Morada, ...],

//   "Todo el año": [Begonia Imperial, Flor de Cilantro, ...],

//   "Invierno": [Bulbo de Hinojo, Kale Rizado, ...],

// }

// Puedes iterar sobre las claves (Verano, Invierno, etc.) para crear las secciones.

*/