import {Map,Marker, GoogleApiWrapper} from 'google-maps-react';
import { InfoWindow } from 'google-maps-react';
import { useState } from 'react';

export function Mymap (props) {
 
  const [activeMarker, setactiveMarker] = useState({position:[1,1]});
  const [showingInfoWindow, setshowingInfoWindow] = useState(false);
  const [position, setposition] = useState([33.8069825,-6.8042828]);
  const [Dragposition, setDragposition] = useState([33.816925,-6.7827177]);

  function onMarkerClick(props,marker,e) {
  
    setactiveMarker(marker)
    setshowingInfoWindow(true)
    setposition([e.latLng.lat(), e.latLng.lng()])   
  }
      
  
  
  function onInfoWindowClose() {  
      setshowingInfoWindow(false)
  }
  
  
  
 

     function moveMarker(props, marker, e) {
          setDragposition([e.latLng.lat(), e.latLng.lng()])
          setshowingInfoWindow(false)
          
        console.log(e.latLng.lat(), e.latLng.lng()) // get the new coordinates after drag end
    }

  function  onMapClicked(){
    setshowingInfoWindow(false)
      };


    if (!props.loaded) return <div>Loading...</div>;


  return (

    <Map
        google={props.google}
        initialCenter={{lat: 33.8069825, lng:-6.8042828}}
        zoom={14}
        onClick={()=>onMapClicked()}
        disableDefaultUI={true}
    >
      

      <Marker onClick={(props,marker,e)=>onMarkerClick(props,marker,e)}

name={'Ain El Aouda'}   
position={{lat: 33.8069825, lng:-6.8042828}}
icon={{url: 'ic2.png',
scaledSize:  new props.google.maps.Size(30,45)}}
/>


<Marker

title={'The marker`s title will appear as a tooltip.'}
onClick={(props,marker,e)=>onMarkerClick(props,marker,e)}
name={'Pharmaceutical Institute '}
icon={{url: 'ic.png',
scaledSize:  new props.google.maps.Size(50,50)}}
position={{lat: Dragposition[0], lng: Dragposition[1]}}
draggable={true}
onDragend={(props,marker,e)=>moveMarker(props,marker,e)}
/> 




<InfoWindow
          marker={activeMarker}
          onClose={onInfoWindowClose}
          visible={showingInfoWindow}>
          <div>
          <h2>{activeMarker.name}</h2>
          <h2>{position[0]};{position[1]}</h2>  
          </div>
        </InfoWindow> 



    </Map>
)
};

 
export default GoogleApiWrapper({
  apiKey: ('AIzaSyDx-T4YwKegFUta-0NiylmGtNzIybblm_s')
})(Mymap)
