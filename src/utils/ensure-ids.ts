/**
 * Agrega un ID único a cada objeto de un arreglo si no lo tiene.
 * Ideal para listas estáticas o que vienen de fuentes sin IDs.
 * Ejemplo:

  import { useMemo } from 'react';
  import { withKeys } from '@/utils/ensure-ids';

  const MyComponent = ({ rawData }) => {
    // Los IDs se generan una sola vez mientras rawData no cambie
    const items = useMemo(() => withKeys(rawData, 'user-list'), [rawData]);

    return (
      <ul>
        {items.map((item) => (
          <li key={item._ui_id}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  };

  Otro ejemplo en caso de un arreglo dentro de un objeto:
  import { useMemo } from 'react';
  import { withKeys } from '@/utils/ensure-ids';

  const TechList = ({ techStack }) => {

    // Procesamos TODA la lista antes del return
    const preparedStack = useMemo(() => {
      return techStack.map((categoryGroup) => ({
        ...categoryGroup,
        // Usamos el nombre de la categoría como prefijo para los items hijos
        itemsWithKeys: withKeys(categoryGroup.items, categoryGroup.category)
      }));
    }, [techStack]);

    return (
      <div>
        {preparedStack.map((group) => (
          <section key={group.category}>
            <h2>{group.category}</h2>
            <ul>
              {group.itemsWithKeys.map((item) => (
                // Aquí ya no hay linter error, porque _ui_id existe
                <li key={item._ui_id}>
                  {item.name}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    );
  };
 */

export function withKeys<T>(
  array: T[],
  prefix: string = "item",
): ((T extends object ? T : { value: T }) & { readonly _ui_id: string })[] {
  return array.map((item, index) => {
    const base = typeof item === "object" ? item : { value: item };
    return {
      ...base,
      _ui_id: `${prefix}-${index}`,
    } as any;
  });
}
