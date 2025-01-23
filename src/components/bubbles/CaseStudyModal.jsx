import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const CaseStudyModal = ({ isOpen, onClose, study }) => {
  if (!study) return null;

  // Safely access data properties
  const { title, cover_image, thumbnail, service_category } = study.data || {};
  const image = cover_image || thumbnail;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-primary-900 border-primary-700">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-primary-100">
            {title}
          </DialogTitle>
          <DialogDescription className="text-lg text-primary-200">
            {service_category}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {image && (
            <div className="w-full aspect-video bg-primary-800 rounded-lg overflow-hidden">
              <img
                src={image.url}
                alt={image.alt || title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="text-primary-200 space-y-4">
            {study.Content ? <study.Content /> : study.data.description}
          </div>

          <div className="flex justify-end">
            <a
              href={`/case-studies/${study.id}`}
              className="inline-flex items-center justify-center px-6 py-3
                bg-feitlijn-yellow text-primary-900 rounded-lg font-medium
                hover:bg-feitlijn-yellow-400 transition-colors"
            >
              Bekijk dit project            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};