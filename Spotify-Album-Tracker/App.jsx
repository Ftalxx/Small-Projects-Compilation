import "./App.css";
import {
  FormControl,
  InputGroup,
  Container,
  Button,
  Card,
  Row,
} from "react-bootstrap";
import { useState, useEffect } from "react";

const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [albums, setAlbums] = useState([]);
  const [albumTracks, setAlbumTracks] = useState({}); // Store tracks for each album

  useEffect(() => {
    let authParams = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        "grant_type=client_credentials&client_id=" +
        clientId +
        "&client_secret=" +
        clientSecret,
    };

    fetch("https://accounts.spotify.com/api/token", authParams)
      .then((result) => result.json())
      .then((data) => {
        setAccessToken(data.access_token);
      });
  }, []);

  async function search() {
    let artistParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    // Get Artist
    const artistID = await fetch(
      "https://api.spotify.com/v1/search?q=" + searchInput + "&type=artist",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        return data.artists.items[0].id;
      });

    // Get Artist Albums
    await fetch(
      "https://api.spotify.com/v1/artists/" +
        artistID +
        "/albums?include_groups=album&market=US&limit=50",
      artistParams
    )
      .then((result) => result.json())
      .then((data) => {
        setAlbums(data.items);
        data.items.forEach((album) => {
          fetchAlbumTracks(album.id);
        });
      });
  }

  async function fetchAlbumTracks(albumID) {
    let tracksParams = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + accessToken,
      },
    };

    const response = await fetch(
      `https://api.spotify.com/v1/albums/${albumID}/tracks`,
      tracksParams
    );
    const data = await response.json();

    // Sort tracks by popularity and select the top 3
    const topTracks = data.items
      .sort((a, b) => b.popularity - a.popularity)
      .slice(0, 3);

    setAlbumTracks((prevTracks) => ({
      ...prevTracks,
      [albumID]: topTracks,
    }));
  }

  return (
    <>
      <Container>
        <InputGroup>
          <FormControl
            placeholder="Search For Artist"
            type="input"
            aria-label="Search for an Artist"
            color="black"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{
              width: "300px",
              height: "30px",
              borderWidth: "0px",
              borderStyle: "solid",
              borderRadius: "5px",
              marginRight: "10px",
              paddingLeft: "10px",
              backgroundColor: '#9D79BC',
              fontFamily: 'serif',
              color: 'black',
            }}
          />
          <Button onClick={search} style={{ fontFamily: "serif" }}>Search</Button>
        </InputGroup>
      </Container>

      <Container>
        <Row
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "flex-start",
            fontFamily: "serif",
          }}
        >
          {albums.map((album) => {
            const tracks = albumTracks[album.id] || [];
            return (
              <Card
                key={album.id}
                style={{
                  backgroundColor: "#A14DA0",
                  margin: "10px",
                  borderRadius: "5px",
                  width: "300px",
                  height: "450px", // Increased height to fit tracks
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Card.Img
                  width={180}
                  src={album.images[0].url}
                  style={{
                    borderRadius: "20%",
                    margin: "5px auto 0",
                  }}
                />
                <Card.Body
                  style={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                  }}
                >
                  <Card.Title
                    style={{
                      whiteSpace: "wrap",
                      fontWeight: "bold",
                      maxWidth: "100%",
                      fontSize: "18px",
                      marginTop: "10px",
                      color: "white",
                      fontFamily: "serif",
                      textDecoration: "underline",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {album.name}
                  </Card.Title>

                  <div
                    style={{
                      backgroundColor: "#f4c6f3",
                      padding: "1.2px",
                      borderRadius: "10px",
                      marginBottom: "-10px",
                      color: "#7E1F86",
                      fontSize: "14px",
                      fontFamily: "serif",
                    }}
                  >
                    <strong>Top 3 Songs:</strong>
                    <div style={{ paddingLeft: "0px", margin: "0" }}>
                      {tracks.map((track) => (
                        <div key={track.id}>{track.name}</div>
                      ))}
                    </div>
                  </div>

                  <Card.Text
                    style={{
                      color: "white",
                      fontSize: "11px",
                      fontFamily: "serif",
                      marginBottom: "50px", // Increased margin to ensure text doesn't overlap with button
                    }}
                  >
                    <strong>Release Date:</strong> <br /> {album.release_date}
                  </Card.Text>
                  
                  <Button
                    href={album.external_urls.spotify}
                    style={{
                      backgroundColor: "#7E1F86",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15px",
                      borderRadius: "5px",
                      padding: "10px",
                      fontFamily: "serif",
                      position: "absolute",
                      bottom: "0px",
                      width: "calc(100% - 20px)",
                    }}
                  >
                    Album Link
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </>
  );
}

export default App;
