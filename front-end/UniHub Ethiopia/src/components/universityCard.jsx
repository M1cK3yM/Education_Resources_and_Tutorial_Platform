import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image } from "@rsuite/icons";

export default function UniversityCard({ name, location, founded, website, logo, isTileView }) {
  return (
    <Card className={`flex ${isTileView ? 'flex-col' : 'flex-row items-center'}`}>
      <div className={`${isTileView ? 'w-full flex justify-center pt-10' : 'w-1/4 p-4'}`}>
        <img src={logo} alt={name} className="h-32 w-32 rounded-full bg-muted mx-auto object-fill" />
      </div>
      <CardHeader className={`${isTileView ? 'w-full' : 'w-1/2'}`}>
        <CardTitle className={`${isTileView ? 'text-center' : ''} text-ellipsis truncate`}>
          {name}
        </CardTitle>
        <CardDescription>{location}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Founded: {founded}</p>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full">
          <a href={website} target="_blank" rel="noopener noreferrer">View</a>
        </Button>
      </CardFooter>
    </Card>
  )
}
