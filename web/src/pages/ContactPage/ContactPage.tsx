// Form helpers to build the contact form
import {
  Form,
  TextField,
  TextAreaField,
  FieldError,
  Submit,
  Label,
  useForm,
  FormError,
} from '@redwoodjs/forms'

// Importing useMutation to define the mutation query
import { MetaTags, useMutation } from '@redwoodjs/web'

// To show toast notifications on screen
import { Toaster, toast } from '@redwoodjs/web/toast'

// GraphQL query "CREATE_CONTACT" to build our Contact record
// that we'll save later on BD
// We use for that a mutation ("CreateContactMutation"), which expects
// an input of type "CreateContactInput" (as defined in the Contact SDL file)
// The mutation calls the method "createContact()" of the Contact service,
// passing to it the previous input
// This method returns (because we have to return something)
// the ID of the new record saved into the BD
const CREATE_CONTACT = gql`
  mutation CreateContactMutation($input: CreateContactInput!) {
    createContact(input: $input) {
      id
    }
  }
`
// Contact page component
const ContactPage = () => {
  // getting the form methods provided by useForm
  // useForm is an form object from RedwoodJS, but it uses
  // "behind the scenes" React Hook Form (https://react-hook-form.com/)
  // which is a library for form validations and son on of React
  // Finally, we can pass this formMethods as a new parameter to our form
  const formMethods = useForm()

  // using the mutation query, which executes our query CREATE_CONTACT and
  // returning an array of objects (GraphQL
  // we use DESTRUCTURING (extract part of an array of objects), creating 2 variables:
  // 1. A variable "create", which will be a function
  // 2. An object "{ loading }"
  const [create, { loading, error }] = useMutation(CREATE_CONTACT, {
    onCompleted: () => {
      toast.success('Thanks for your message!')
      // clearing form fields values
      formMethods.reset()
    },
  })

  // onSubmit(): receives the data sent by the form and calls the previous
  // "create" function defined above, which uses the mutation query we defined
  // at the top ("CREATE_CONTACT"), passing the "data" to it

  // Because we're working with GraphQL queries, we need to "build"
  // a GraphQL object which we'll write in our BD server
  // The first member of this object is calle by convention "variables",
  // who wants its "input", which are the data sent through the form
  const onSubmit = (data) => {
    //console.log(data)
    create({
      variables: {
        input: data,
      },
    })
  }

  return (
    <>
      <MetaTags title="Contact" description="Contact page" />

      <Toaster />
      <Form
        onSubmit={onSubmit}
        config={{ mode: 'onBlur' }}
        formMethods={formMethods}
        error={error}
      >
        <FormError error={error} wrapperClassName="form-error" />
        <Label name="name" errorClassName="error">
          Name
        </Label>
        <TextField
          name="name"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="name" className="error" />

        <Label name="email" errorClassName="error">
          Email
        </Label>
        <TextField
          name="email"
          errorClassName="error"
          validation={{
            required: true,
            pattern: { value: /^[^@]+@[^.]+\..+$/ },
          }}
        />
        <FieldError name="email" className="error" />

        <Label name="message" errorClassName="error">
          Message
        </Label>
        <TextAreaField
          name="message"
          errorClassName="error"
          validation={{ required: true }}
        />
        <FieldError name="message" className="error" />

        <Submit disabled={loading}>Send message</Submit>
      </Form>
    </>
  )
}

export default ContactPage
