package CMS;


/**
 * Generated from IDL interface "CustomerInfoService".
 *
 * @author JacORB IDL compiler V 3.9
 * @version generated at Apr 4, 2025, 3:18:30 AM
 */

public abstract class CustomerInfoServiceHelper
{
	private volatile static org.omg.CORBA.TypeCode _type;
	public static org.omg.CORBA.TypeCode type ()
	{
		if (_type == null)
		{
			synchronized(CustomerInfoServiceHelper.class)
			{
				if (_type == null)
				{
					_type = org.omg.CORBA.ORB.init().create_interface_tc("IDL:CMS/CustomerInfoService:1.0", "CustomerInfoService");
				}
			}
		}
		return _type;
	}

	public static void insert (final org.omg.CORBA.Any any, final CMS.CustomerInfoService s)
	{
			any.insert_Object(s);
	}
	public static CMS.CustomerInfoService extract(final org.omg.CORBA.Any any)
	{
		return narrow(any.extract_Object()) ;
	}
	public static String id()
	{
		return "IDL:CMS/CustomerInfoService:1.0";
	}
	public static CMS.CustomerInfoService read(final org.omg.CORBA.portable.InputStream in)
	{
		return narrow(in.read_Object(CMS._CustomerInfoServiceStub.class));
	}
	public static void write(final org.omg.CORBA.portable.OutputStream _out, final CMS.CustomerInfoService s)
	{
		_out.write_Object(s);
	}
	public static CMS.CustomerInfoService narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerInfoService)
		{
			return (CMS.CustomerInfoService)obj;
		}
		else if (obj._is_a("IDL:CMS/CustomerInfoService:1.0"))
		{
			CMS._CustomerInfoServiceStub stub;
			stub = new CMS._CustomerInfoServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
		else
		{
			throw new org.omg.CORBA.BAD_PARAM("Narrow failed");
		}
	}
	public static CMS.CustomerInfoService unchecked_narrow(final org.omg.CORBA.Object obj)
	{
		if (obj == null)
		{
			return null;
		}
		else if (obj instanceof CMS.CustomerInfoService)
		{
			return (CMS.CustomerInfoService)obj;
		}
		else
		{
			CMS._CustomerInfoServiceStub stub;
			stub = new CMS._CustomerInfoServiceStub();
			stub._set_delegate(((org.omg.CORBA.portable.ObjectImpl)obj)._get_delegate());
			return stub;
		}
	}
}
