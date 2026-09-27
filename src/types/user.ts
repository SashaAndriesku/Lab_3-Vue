export interface User {
  id: number
  gender: string
  details?: string      
  hobbies?: string[]    
  name: {
    title: string
    first: string
    last: string
  }
  location: {
    street: {
      number: number
      name: string
    }
    city: string
    state: string
    country: string
    postcode: string | number
    coordinates?: {
      latitude: string
      longitude: string
    }
    timezone: {
      offset: string
      description: string
    }
  }
  email: string
  dob: {
    date: string
    age: number
  }
  phone: string
  cell: string
  picture: string
}