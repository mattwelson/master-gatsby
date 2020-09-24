import React from 'react'
import { FaPepperHot as icon, FaCarrot, FaBacon } from 'react-icons/fa'

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Name of the topping',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian?',
      type: 'boolean',
      description: 'Is this topping vegetarian friendly?',
      options: { layout: 'checkbox' },
    },
  ],
  initialValue: {
    vegetarian: false,
  },
  preview: {
    select: {
      name: 'name',
      vegetarian: 'vegetarian',
    },
    prepare: ({ name, vegetarian }) => ({
      title: name,
      media: vegetarian ? <FaCarrot /> : <FaBacon />,
    }),
  },
}
