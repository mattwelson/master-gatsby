import { graphql, Link, useStaticQuery } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

const ToppingsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;

  a {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
  }

  .count {
    background: white;
    padding: 2px 5px;
  }

  [aria-current='page'] {
    background: var(--yellow);
  }
`

function getPizzaCounts(pizzas) {
  const counts = pizzas.nodes
    .map((pizza) => pizza.toppings)
    .flat()
    .reduce(
      (acc, topping) => ({
        ...acc,
        [topping.id]: {
          ...topping,
          ...acc[topping.id],
          count: acc[topping.id]?.count + 1 || 1,
        },
      }),
      {}
    )
  return Object.values(counts).sort(
    (a, b) => b.count - a.count || a.name.localeCompare(b.name)
  )
}

export default function ToppingsFilter() {
  // get a list of all the toppings
  // get a list of all the pizzas
  const { pizzas } = useStaticQuery(graphql`
    query {
      pizzas: allSanityPizza {
        nodes {
          toppings {
            id
            name
          }
        }
      }
    }
  `)
  // count pizzas for each toppings
  const counts = getPizzaCounts(pizzas)
  // loop over all toppings and display toppings name and count
  // Add links ...
  // Reload me
  return (
    <ToppingsStyles>
      <Link to="/pizza">
        <div className="name">All</div>
        <div className="count">{pizzas.nodes.length}</div>
      </Link>
      {counts.map(({ count, id, name }) => (
        <Link to={`/pizza/topping/${name}`} key={id}>
          <span className="name">{name}</span>
          <span className="count">{count}</span>
        </Link>
      ))}
    </ToppingsStyles>
  )
}
