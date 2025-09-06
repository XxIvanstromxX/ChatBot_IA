const buildCannedResponse = (userInput) => {
  const input = userInput.toLowerCase();

  if (
    input.includes("shorts") ||
    input.includes("camiseta") ||
    input.includes("tenis") ||
    input.includes("chamarra") ||
    input.includes("busco") ||
    input.includes("recomienda")
  ) {
    return null;
  }

  if (
    input.includes("clima") ||
    input.includes("frio") ||
    input.includes("calor")
  ) {
    return "Para el clima, te recomiendo ropa ligera si hace calor y unca chamarra deportiva si hace frío";
  }

  if (input.includes("talla")) {
    return "Nuestras tallas van de XS a XL, ¿Me puedes decir tu estatura y peso aproximado para recomendarte mejor";
  }

  if (
    input.includes("gimnasio") ||
    input.includes("correr") ||
    input.includes("yoga")
  ) {
    return "Para el gimnasio: shorts transpirables y camiseta dry-fit. Para correr: tenis adecuads y ropa ligera. Para yoga: ropa cómoda y flexible";
  }

  return null;
};

module.exports = { buildCannedResponse };
