import { graphql } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const SinglePizzaStyles = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`

export default function SinglePizzaPage({
  data: {
    pizza: { name, toppings, image },
  },
}) {
  return (
    <SinglePizzaStyles>
      <Img fluid={image.asset.fluid} />
      <div>
        <h2 className="mark">{name}</h2>
        <ul>
          {toppings.map(({ id, name: tName }) => (
            <li key={id}>{tName}</li>
          ))}
        </ul>
      </div>
    </SinglePizzaStyles>
  )
}

export const query = graphql`
  query($slug: String) {
    pizza: sanityPizza(slug: { current: { eq: $slug } }) {
      name
      id
      toppings {
        id
        name
        vegetarian
      }
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`
