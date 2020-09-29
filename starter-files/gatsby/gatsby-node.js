import path from 'path'

async function turnPizzasIntoPages({ graphql, actions }) {
  const component = path.resolve('./src/templates/Pizza.js')
  const { data } = await graphql(`
    query {
      pizzas: allSanityPizza {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `)

  data.pizzas.nodes.forEach((pizza) =>
    actions.createPage({
      component,
      path: `pizza/${pizza.slug.current}`,
      context: {
        slug: pizza.slug.current,
      },
    })
  )
}

async function turnToppingsIntoPages({ graphql, actions }) {
  const component = path.resolve('./src/pages/pizza.js')
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          id
          name
        }
      }
    }
  `)

  data.toppings.nodes.forEach(({ name }) =>
    actions.createPage({
      component,
      path: `pizza/topping/${name}`,
      context: {
        topping: name,
      },
    })
  )
}

export async function createPages({ graphql, actions }) {
  // Create pages dynamically
  await Promise.all([
    // Create Pizza pages
    turnPizzasIntoPages({ graphql, actions }),
    // Create Topping pages
    turnToppingsIntoPages({ graphql, actions }),
  ])
  // Create SliceMasters pages
}
