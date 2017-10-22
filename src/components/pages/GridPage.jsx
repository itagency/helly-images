import React from 'react';
import axios from 'axios';
import Gallery from 'react-photo-gallery';
import Lightbox from 'react-images';
import Measure from 'react-measure';
import ReactLoading from 'react-loading';
import { debounce } from '../../utils';
import HHImage from '../HHImage';
import {
  Link
} from 'react-router-dom';

import { BASE_URL } from '../../constants';

import './gridpage.css';

const CLOUDINARY_SPACE = process.env.NODE_ENV === 'development' ? 'dwd2ufxeu' : 'dyxr54inb';

export default class GridPage extends React.Component {
  constructor() {
    super();
    this.state = { photos: [], pageNum: 1, totalPages: 1, loadedAll: false, currentImage: 0, width: -1, nextCursor: null };
    this.handleScroll = this.handleScroll.bind(this);
    this.loadMorePhotos = this.loadMorePhotos.bind(this);
    this.closeLightbox = this.closeLightbox.bind(this);
    this.openLightbox = this.openLightbox.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.gotoPrevious = this.gotoPrevious.bind(this);
  }
  componentDidMount() {
    this.loadMorePhotos();
    this.loadMorePhotos = debounce(this.loadMorePhotos, 200);
    window.addEventListener('scroll', this.handleScroll);
  }
  handleScroll() {
    // let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if (!this.state.loadedAll) {
      this.loadMorePhotos();
    }
  }
  loadMorePhotos(e) {
    if (e) {
      e.preventDefault();
    }
    if (this.state.pageNum > this.state.totalPages) {
      this.setState({ loadedAll: true });
      return;
    }

    const cursor = this.state.nextCursor ? `?next_cursor=${this.state.nextCursor}` : '';

    let url = BASE_URL + cursor;
    let self = this;
    axios.get(url)
    .then(function (response) {
      let photoSet = self.state.photos;
      let images = response.data.images;
      console.log(images);
      images.map((p, i) => {
        let altText = '';
        let captionText = '';
        if (p.context) {
          altText = p.context.custom.alt !== '' ? p.context.custom.alt : '';
          captionText = p.context.custom.caption !== '' ? p.context.custom.caption : '';
          console.log('its running');
          console.log(altText);
          console.log(captionText);
        }
        return photoSet.push({
          src: p.url,
          srcSet: [
            `https://res.cloudinary.com/${CLOUDINARY_SPACE}/image/upload/w_1024/q_auto:eco/${p.public_id}.${p.format} 1024w`,
            `https://res.cloudinary.com/${CLOUDINARY_SPACE}/image/upload/w_800/q_auto:eco/${p.public_id}.${p.format} 800w`,
            `https://res.cloudinary.com/${CLOUDINARY_SPACE}/image/upload/w_500/q_auto:eco/${p.public_id}.${p.format} 500w`,
            `https://res.cloudinary.com/${CLOUDINARY_SPACE}/image/upload/w_320/q_auto:eco/${p.public_id}.${p.format} 320w`,
          ],
          sizes: ['(min-width: 480px) 50vw', '(min-width: 1024px) 33.3vw', '100vw'],
          width: p.width,
          height: p.height,
          alt: `${altText} | ${captionText}`
        });
      });
      self.setState({
        nextCursor: response.data.next_cursor ? response.data.next_cursor : null,
        photos: photoSet,
        loadedAll: response.data.next_cursor? false : true
      });
    })
    .catch(function (error) {
      console.error(error);
    });
  }
  openLightbox(event, obj) {
    this.setState({
      currentImage: obj.index,
      lightboxIsOpen: true,
    });
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    });
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    });
  }
  gotoNext() {
    // load more photos if scrolling into the lightbox
    if (this.state.photos.length - 2 === this.state.currentImage) {
      this.loadMorePhotos();
    }
    this.setState({
      currentImage: this.state.currentImage + 1,
    });
  }
  renderGallery() {
    const width = this.state.width;
    return (
      <Measure bounds onResize={(contentRect) => this.setState({ width: contentRect.bounds.width })}>
        {
          ({ measureRef }) => {
            // fix flash of one col and large image
            // don't try to load gallery until width is bigger
            if (width < 1) {
              return <div ref={measureRef}></div>;
            }
            let columns = 3;
            if (width >= 480) {
              columns = 3;
            }
            if (width >= 1024) {
              columns = 10;
            }
            if (width >= 1824) {
              columns = 20;
            }
            return <div ref={measureRef}>
              <Gallery
                photos={this.state.photos}
                columns={columns}
                onClick={this.openLightbox}
                ImageComponent={HHImage}
              />
            </div>
          }
        }
      </Measure>
    );
  }

  render() {
    if (this.state.photos) {
      return (
        <div className="grid">
          {this.renderGallery()}
          <Lightbox
            theme={{ container: { background: 'rgba(0, 0, 0, 0.85)' } }}
            images={this.state.photos.map(x => ({ ...x, srcset: x.srcSet, caption: x.alt }))}
            backdropClosesModal={true}
            onClose={this.closeLightbox}
            onClickPrev={this.gotoPrevious}
            onClickNext={this.gotoNext}
            currentImage={this.state.currentImage}
            isOpen={this.state.lightboxIsOpen}
            width={1600}
          />

          {!this.state.loadedAll && (
            <div className="loading-msg" id="msg-loading-more">
              <ReactLoading type="bars" color="#DF1C2E" delay={0} />
            </div>
          )}
          <div className="grid__upload">
            <Link to="/upload_image" className="grid__button">Upload your photos</Link>
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div id="msg-app-loading" className="loading-msg">
            <ReactLoading type="cubes" color="#DF1C2E" />
          </div>
        </div>
      );
    }
  }
};
