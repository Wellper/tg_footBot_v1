async function sendFormAdd(href, enqueueSnackbar, body) {
  const requestOptionsExit_body = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
  var getData = await fetch(href, requestOptionsExit_body)
    .then((response) => {
      if (response.status === 500) {
        enqueueSnackbar('Error: ' + response.status + ' ' + response.statusText, {
          variant: 'error',
        });
      }
      return response.json();
    })
    .then((response) => {
      if (response.error !== null) {
        enqueueSnackbar(
          localization.GT(`createObject.` + `${response.error}`.replace(/[.]/g, '')),
          {
            variant: 'error',
          }
        );
        return response;
      } else if (response.data !== null) {
        return response;
      }
    })
    .catch(() => {
      // Handle the error
      enqueueSnackbar('Server connection error', {
        variant: 'error',
      });
    });
  return getData;
}
