

    export async function baseCall(route, body){
        const response = await fetch('http://localhost:4000/api/' + route, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
          });
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const responseData = await response.json();
          return responseData
    }
