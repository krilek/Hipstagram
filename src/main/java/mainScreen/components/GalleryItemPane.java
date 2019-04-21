package mainScreen.components;

import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.layout.GridPane;
import javafx.scene.text.Text;

import java.io.FileInputStream;
import java.io.IOException;

public class GalleryItemPane extends GridPane {
    private int id;

    @FXML
    private ImageView image;
    @FXML
    private Text title;

//    private StringProperty imagePath = new SimpleStringProperty();
//    private StringProperty imageTitle = new SimpleStringProperty();

    //    public GalleryItemPane(){
//        Image image = new Image("/img/logo.jpg");
//        this.image = new ImageView(image);
//        this.image.setPreserveRatio(true);
//        this.title = new Text();
//        RowConstraints imageRow = new RowConstraints();
//        imageRow.setPercentHeight(80.0);
//        RowConstraints titleRow = new RowConstraints();
//        titleRow.setPercentHeight(20.0);
//
//        this.getRowConstraints().addAll(imageRow, titleRow);
//        this.getColumnConstraints().add(column);
//        this.add(this.image, 0,0);
//        this.add(this.title, 0, 1);
//    }
    public GalleryItemPane() {
        this("", "");
    }

    public GalleryItemPane(String imagePath, String imageTitle) {
        FXMLLoader fxmlLoader = new FXMLLoader(getClass().getResource("/views/components/GalleryItemPane.fxml"));
        fxmlLoader.setRoot(this);
        fxmlLoader.setController(this);
        try {
            if (!imagePath.isEmpty()) {
                FileInputStream input = new FileInputStream(imagePath);
                Image image = new Image(input);
                this.image.setImage(image);
            }
            if (!imageTitle.isEmpty()) {
                this.title = new Text(imageTitle);
            }
            fxmlLoader.load();
        } catch (IOException e) {
            System.out.println("Failed to load " + "/views/components/GalleryItemPane.fxml" + " or given image " + imagePath + ".");
        }

    }
//    FileInputStream input = new FileInputStream(imagePath);
//        Image image = new Image(input);
//        this.image = new ImageView(image);
//        this.image.setPreserveRatio(true);
//        this.title = new Text("");
////        this.title = new Text(imageTitle);
//        RowConstraints imageRow = new RowConstraints();
//        imageRow.setPercentHeight(80.0);
//        RowConstraints titleRow = new RowConstraints();
//        titleRow.setPercentHeight(20.0);
//        ColumnConstraints column = new ColumnConstraints();
//        column.setHalignment(HPos.CENTER);
//        this.getRowConstraints().addAll(imageRow, titleRow);
//        this.getColumnConstraints().add(column);
//        this.add(this.image, 0,0);
//        this.add(this.title, 0, 1);

//    }

//    public String getImagePath() {
//        return imagePath.get();
//    }
//
//    public StringProperty imagePathProperty() {
//        return imagePath;
//    }
//
//    public void setImagePath(String imagePath) {
//        this.imagePath.set(imagePath);
//    }

//    public String getImageTitle() {
//        return imageTitle.get();
//    }
//
//    public StringProperty imageTitleProperty() {
//        return imageTitle;
//    }
//
//    public void setImageTitle(String imageTitle) {
//        this.imageTitle.set(imageTitle);
//    }
}
