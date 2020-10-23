# My Password Hasher

**Study** - A password hasher build in Node.js.

Based on this [tutorial](https://blog.logrocket.com/building-a-password-hasher-in-node-js/).

## How to use

---
### Generate Salt function

```js
generateSalt() // <- returns a random hex string.
```
> Can receive one number parameter, for the rounds, how much bigger the generated string. By default is 12.

---
### Hash

```js
hash('random_string', 'salt_string') // <- returns a hashing result object.
```

**Return**
```js
{
  salt: 'used_salt',
  hashedPassword: 'hashed_password_string'
}
```

---
### Compare
```js
compare('string_to_compare', { hash_result_object }) // <- returns a boolean.
```
