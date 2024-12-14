package libs

import (
	"fmt"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
)

type UploadFile interface {
	Upload(ctx *fiber.Ctx) (*string, *ErrorResponse)
}
type UploadFileImpl struct{}

func NewUploadFile() UploadFile {
	return &UploadFileImpl{}
}

func (l *UploadFileImpl) Upload(ctx *fiber.Ctx) (*string, *ErrorResponse) {
	var fileName string
	fileReq, errFileReq := ctx.FormFile("file")
	if errFileReq == nil {
		if fileReq.Size > 2<<20 {
			return nil, &ErrorResponse{Status: 400, Message: "File too large"}
		}
		now := time.Now().Format("2006-01-02-230059")
		fileFormat := strings.Split(fileReq.Filename, ".")
		extensionFile := string(fileFormat[len(fileFormat)-1])

		if extensionFile != "jpg" && extensionFile != "png" && extensionFile != "jpeg" {
			return nil, &ErrorResponse{Status: 400, Message: "Invalid file format"}
		}

		newFileName := fmt.Sprintf("%s.%s", now, extensionFile)

		err := ctx.SaveFile(fileReq, fmt.Sprintf("./public/uploads/%s", newFileName))
		if err != nil {
			return nil, &ErrorResponse{Status: 400, Message: "Failed to save file"}
		}
		fileName = fmt.Sprintf("uploads/%s", newFileName)
	}
	return &fileName, nil
}
