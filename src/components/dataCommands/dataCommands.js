export default async function dataCommands(people, api, method, params) {
    try {
      const response = await fetch(`/api/${api}`, {
          method: method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(people)
        });
      if (!response.ok) {
        throw new Error("Failed data command");
      }
    } catch (error) {
      console.error(error.message);
    }
  }