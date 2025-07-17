const axios = require("axios");

async function getShow(showName) {
  const details = await axios.get(
    `https://api.tvmaze.com/search/shows?q=${showName}`
  );
  return details.data;
}

async function getCast(id) {
  const details = await axios.get(`https://api.tvmaze.com/shows/${id}/cast`);
  return details.data;
}

async function getImages(id) {
  const images = await axios.get(`https://api.tvmaze.com/shows/${id}/images`);
  return images.data;
}

async function getSeasons(id) {
  const seasons = await axios.get(`https://api.tvmaze.com/shows/${id}/seasons`);
  return seasons.data;
}

async function getEpisodes(id) {
  const episodes = await axios.get(
    ` https://api.tvmaze.com/seasons/${id}/episodes`
  );
  return episodes.data;
}

module.exports = { getShow, getCast, getImages, getSeasons, getEpisodes };
