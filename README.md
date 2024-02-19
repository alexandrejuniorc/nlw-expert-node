[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[POSTGRESQL_BADGE]: https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=fff&style=for-the-badge
[FASTIFY_BADGE]: https://img.shields.io/badge/Fastify-000?logo=fastify&logoColor=fff&style=for-the-badge
[PRISMA_BADGE]: https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=fff&style=for-the-badge
[REDIS_BADGE]: https://img.shields.io/badge/Redis-DC382D?logo=redis&logoColor=fff&style=for-the-badge
[ZOD_BADGE]: https://img.shields.io/badge/Zod-3E67B1?logo=zod&logoColor=fff&style=for-the-badge

<h1 align="center" style="font-weight: bold;">NLW Expert - Node.js 💻</h1>

![typescript][TYPESCRIPT__BADGE]
![postgresql][POSTGRESQL_BADGE]
![fastify][FASTIFY_BADGE]
![prisma][PRISMA_BADGE]
![redis][REDIS_BADGE]
![zod][ZOD_BADGE]

<p align="center">
 <a href="#started">Getting Started</a> • 
  <a href="#routes">API Endpoints</a> •
 <a href="#colab">Collaborators</a> •
 <a href="#contribute">Contribute</a>
</p>

<p align="center">
  <b>Api created to create polls/votes with the functionality to carry out votes in real time using websockets.</b>
</p>

<h2 id="started">🚀 Getting started</h2>



```bash
# Installing dependencies
npm install

# Starting Prisma
npx prisma generate

# Starting Docker Compose
docker-compose up -d
```

<h3>Pre-requisites</h3>

Here you list all prerequisites necessary for running your project. For example:

- [NodeJS](https://github.com/)
- [Git 2](https://github.com)

<h3>Cloning</h3>

How to clone your project

```bash
git clone https://github.com/alexandrejuniorc/nlw-expert-node.git
```

<h3> Environment Variables</h2>

Use the `env.example` as reference to create your configuration file `.env` with your Docker Credentials

```yaml
DATABASE_URL="postgresql://user:password@localhost:5432/database?schema=public"
```

<h3>Starting</h3>

How to start your project

```bash
# Go to the project folder
cd nlw-expert-node

# Starting Server
npm run dev
``````

<h2 id="routes">📍 API Endpoints</h2>

Here you can list the main routes of your API, and what are their expected request bodies.
​
| route               | description                                          
|----------------------|-----------------------------------------------------
| <kbd>POST /polls</kbd>     | create a poll into the api see [request poll details](#post-polls)
| <kbd>GET /polls/:pollId</kbd>     | retrieves poll info see [response poll details](#get-poll)
| <kbd>POST /polls/:pollId/votes</kbd>     | vote on poll into the api see [request vote on poll details](#post-vote-on-poll)

<h3 id="post-polls">POST /polls</h3>

**REQUEST**
```json
{
  "title": "The Best Player of the World",
  "options": ["Messi", "Cristiano Ronaldo", "Neymar"]
}
```

**RESPONSE**
```json
{
  "pollId": "OwoMRHsaQwyAgVoc3OXmL1JhMVUYXGGBbCTK0GBgiYitwQwjf0gVoBmkbuyy0pSi"
}
```

<h3 id="get-poll">GET /polls/:pollId</h3>

**RESPONSE**
```json
{
  "id": 1,
  "title": "The Best Player of the World",
  "options": [
  {"id": 0, "title": "Messi", "score": 10},
  {"id": 0, "title": "Cristiano Ronaldo", "score": 99},
  {"id": 0, "title": "Neymar", "score": 98}
  ]
}
```

<h3 id="post-vote-on-poll">POST /polls</h3>

**REQUEST**
```json
{
  "pollOptionId": "0",
}
```

**RESPONSE**
```json
{
  "pollOptionId": "0",
  "votes": 11
}
```

<h2 id="colab">🤝 Collaborators</h2>

<table>
  <tr>
    <td align="center">
      <a href="#">
        <img src="https://avatars.githubusercontent.com/alexandrejuniorc" width="100px;" alt="Alexandre Junior Profile Picture"/><br>
        <sub>
          <b>Alexandre Junior</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

<h3>Documentations that might help</h3>

[📝 How to create a Pull Request](https://www.atlassian.com/br/git/tutorials/making-a-pull-request)

[💾 Commit pattern](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
