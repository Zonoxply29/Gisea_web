(() => {
    const xhr = new XMLHttpRequest();
    const $email = document.getElementById("email");
    const $phone = document.getElementById("phone");
    const $street = document.getElementById("street");
    const $city = document.getElementById("city");
    const $fragment = document.createDocumentFragment();

    xhr.addEventListener('readystatechange', e => {
        if (xhr.readyState !== 4) return;
        if (xhr.status >= 200 && xhr.status < 300) {
            let json = JSON.parse(xhr.responseText);
            json.forEach(el => {
                if (el.name === "Leanne Graham") {
                    // Email
                    const $pEmail = document.createElement("p");
                    $pEmail.innerHTML = `${el.email}`;
                    $fragment.appendChild($pEmail);
                    $email.appendChild($fragment);

                    // Phone
                    const $pPhone = document.createElement("p");
                    $pPhone.innerHTML = `${el.phone}`;
                    $fragment.appendChild($pPhone);
                    $phone.appendChild($fragment);

                    // Street
                    const $pStreet = document.createElement("p");
                    $pStreet.innerHTML = `${el.address.street}`;
                    $fragment.appendChild($pStreet);
                    $street.appendChild($fragment);

                    // City
                    const $pCity = document.createElement("p");
                    $pCity.innerHTML = `${el.address.city}`;
                    $fragment.appendChild($pCity);
                    $city.appendChild($fragment);
                }
            });
        } else {
            console.log("error");
        }
    });

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send();
})();