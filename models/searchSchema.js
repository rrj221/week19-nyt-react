var schema = (
  <Schema>
    <Property
      name="description"
      required
      label="Message"
      input={<textarea placeholder="Give us details here..." />}
    />
    <Property
      name="email"
      label="Email"
      required
      input={<input type="email" />}
      validate={function(v) { return /.+\@.+\..+/.test(v) }}
    />
  </Schema>
)