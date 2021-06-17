import './style.css'
import { FacebookOutlined ,TwitterOutlined,InstagramOutlined,GithubOutlined} from '@ant-design/icons';
function HomeProduct () {
    return (

        <div class="container">
    
        <div class="card-wrapper">
          
          <div class="card">
            
            <div class="card-image">
              <img src="https://image.ibb.co/dUTfmJ/profile_img.jpg" alt="profile one"/>
            </div>
    
          <ul class="social-icons">
            <li>
              <a href="">
               <FacebookOutlined/>
              </a>
            </li>
            <li>
              <a href="">
              <InstagramOutlined />
              </a>
            </li>
            <li>
              <a href="">
              <TwitterOutlined />
              </a>
            </li>
            <li>
              <a href="">
              <GithubOutlined />
              </a>
            </li>
          </ul>
    
          <div class="details">
            <h2>John Smith
             
              <span class="job-title">UI Developer</span>
            </h2>
          </div>
        </div>
      </div>
        
        
    <div class="card-wrapper">
          
          <div class="card profile-two">
            
            <div class="card-image profile-img--two">
              <img src="https://image.ibb.co/c9rY6J/profile02.jpg" alt="profile two"/>
            </div>
    
            <ul class="social-icons">
              <li>
                <a href="">
                <FacebookOutlined />
                </a>
              </li>
              <li>
                <a href="">
                <InstagramOutlined />
                </a>
              </li>
              <li>
                <a href="">
                <TwitterOutlined />
                </a>
              </li>
              <li>
                <a href="">
                <GithubOutlined />
                </a>
              </li>
            </ul>
    
        </div>
     </div>
         
     </div>

    )
}
export default HomeProduct;
